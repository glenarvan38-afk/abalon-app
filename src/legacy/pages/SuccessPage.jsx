export default function SuccessPage() {
    return (
      <div className="container-custom max-w-3xl py-16">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center space-y-4">
          <h1 className="text-3xl font-display">Payment successful ✅</h1>
          <p className="text-gray-600">
            Your subscription is active. You can now use contractor features.
          </p>
  
          <div className="pt-4 flex gap-3 justify-center">
            <a className="btn btn-primary" href="/login">Go to Login</a>
            <a className="btn btn-outline" href="/">Back to Home</a>
          </div>
        </div>
      </div>
    );
  }
  