"use client";

import { useEffect, useMemo, useState } from 'react';
import Map, { Marker, Source, Layer } from 'react-map-gl/mapbox';

// Small helper to build an approximate geodesic circle polygon (WGS84)
function circleGeoJSON(lng, lat, radiusMiles, steps = 64) {
  const radiusKm = radiusMiles * 1.609344;
  const earthRadiusKm = 6371;
  const coords = [];

  const toRad = (d) => (d * Math.PI) / 180;
  const toDeg = (r) => (r * 180) / Math.PI;

  const latRad = toRad(lat);
  const lngRad = toRad(lng);
  const angDist = radiusKm / earthRadiusKm;

  for (let i = 0; i <= steps; i++) {
    const bearing = (2 * Math.PI * i) / steps;
    const sinLat = Math.sin(latRad);
    const cosLat = Math.cos(latRad);

    const sinAng = Math.sin(angDist);
    const cosAng = Math.cos(angDist);

    const lat2 = Math.asin(sinLat * cosAng + cosLat * sinAng * Math.cos(bearing));
    const lng2 = lngRad + Math.atan2(
      Math.sin(bearing) * sinAng * cosLat,
      cosAng - sinLat * Math.sin(lat2)
    );

    coords.push([toDeg(lng2), toDeg(lat2)]);
  }

  return {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'Polygon',
      coordinates: [coords],
    },
  };
}

async function geocodeAddress(address, token) {
  const q = encodeURIComponent(address);
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${q}.json?limit=1&types=address,place,postcode&access_token=${token}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Geocoding failed');
  const json = await res.json();
  const first = json?.features?.[0];
  if (!first?.center) return null;
  const [lng, lat] = first.center;
  return { lng, lat };
}

export default function ServiceAreaMap({ address, radiusMiles, onCenterChange }) {
  // Next.js: use NEXT_PUBLIC_MAPBOX_TOKEN (not VITE_MAPBOX_TOKEN)
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  const [center, setCenter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mapError, setMapError] = useState(null);

  // Geocode when address changes
  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      setError(null);
      if (!token || !address || address.trim().length < 6) {
        setCenter(null);
        return;
      }
      setLoading(true);
      try {
        const result = await geocodeAddress(address, token);
        if (cancelled) return;
        setCenter(result);
        if (result && typeof onCenterChange === 'function') onCenterChange(result);
      } catch (e) {
        if (cancelled) return;
        setError('Mapbox geocoding error');
        setCenter(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    // Debounce a bit
    const t = setTimeout(run, 450);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [address, token, onCenterChange]);

  const circle = useMemo(() => {
    if (!center) return null;
    const r = Number(radiusMiles) || 50;
    return circleGeoJSON(center.lng, center.lat, r);
  }, [center, radiusMiles]);

  const layer = useMemo(() => ({
    id: 'service-radius-fill',
    type: 'fill',
    paint: {
      'fill-color': '#1e90ff',
      'fill-opacity': 0.12,
    },
  }), []);

  const outlineLayer = useMemo(() => ({
    id: 'service-radius-outline',
    type: 'line',
    paint: {
      'line-color': '#1e90ff',
      'line-width': 2,
      'line-opacity': 0.75,
    },
  }), []);

  if (!token) {
    return (
      <div className="map-placeholder">
        <div className="map-placeholder-content">
          <div className="map-icon">🗺️</div>
          <p>Map preview unavailable (NEXT_PUBLIC_MAPBOX_TOKEN not set)</p>
          <p style={{ fontSize: 12, opacity: 0.7 }}>You can still proceed using radius only</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="map-placeholder">
        <div className="map-placeholder-content">
          <div className="map-icon">🗺️</div>
          <p>Loading map…</p>
        </div>
      </div>
    );
  }

  if (!center) {
    return (
      <div className="map-placeholder">
        <div className="map-placeholder-content">
          <div className="map-icon">🗺️</div>
          <p>Interactive Map</p>
          <p style={{ fontSize: 12, opacity: 0.8 }}>
            Enter a valid address to preview your service radius
          </p>
          {error ? <p style={{ color: '#b00020', fontSize: 12 }}>{error}</p> : null}
        </div>
      </div>
    );
  }

  if (mapError) {
    return (
      <div className="map-placeholder">
        <div className="map-placeholder-content">
          <div className="map-icon">🗺️</div>
          <p>Map failed to load</p>
          <p style={{ fontSize: 12, opacity: 0.7 }}>Using radius only — you can still proceed</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: 260, width: '100%', borderRadius: 8, overflow: 'hidden' }}>
      <Map
        mapboxAccessToken={token}
        initialViewState={{ longitude: center.lng, latitude: center.lat, zoom: 9 }}
        longitude={center.lng}
        latitude={center.lat}
        zoom={9}
        onMove={(evt) => {
          // Keep center in sync if user pans
          const { longitude, latitude } = evt.viewState;
          setCenter({ lng: longitude, lat: latitude });
          if (typeof onCenterChange === 'function') onCenterChange({ lng: longitude, lat: latitude });
        }}
        onError={(e) => {
          console.warn('Mapbox map error:', e);
          setMapError(e?.error?.message || 'Map error');
        }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
      >
        <Marker longitude={center.lng} latitude={center.lat} anchor="bottom">
          <div style={{ fontSize: 22 }}>📍</div>
        </Marker>

        {circle ? (
          <Source id="service-radius" type="geojson" data={circle}>
            <Layer {...layer} />
            <Layer {...outlineLayer} />
          </Source>
        ) : null}
      </Map>
    </div>
  );
}
