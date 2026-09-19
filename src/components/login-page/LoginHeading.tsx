import { LOGIN_PAGE_COPY } from "@/constants/loginPage";

function LoginHeading() {
  return (
    <h1 className="mb-3 font-normal text-xl leading-7 tracking-normal text-[#020618] text-center login:text-left">
      {LOGIN_PAGE_COPY.headingLine1}
      <br />
      {LOGIN_PAGE_COPY.headingLine2}
      <br />
      {LOGIN_PAGE_COPY.headingLine3}
    </h1>
  );
}

export default LoginHeading;
