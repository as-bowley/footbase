import "@/components/LoginPage/styles/LoginPage.css";
import AuthForm from "@/components/auth/auth-form";
import loginPageImg from "@img/fb-bg.jpg";

const LoginPage = () => {
  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:flex lg:w-1/2 bg-gray-100 items-center justify-center">
        <img
          src={loginPageImg}
          alt="Football"
          width={600}
          height={600}
          className="object-cover h-full w-full"
        />
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900">Footbase</h1>
            <p className="text-gray-600 mt-2">
              Your ultimate football companion
            </p>
          </div>
          <AuthForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
