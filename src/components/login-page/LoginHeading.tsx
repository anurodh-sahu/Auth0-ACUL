interface LoginHeadingProps {
  title: string;
  description?: string;
}

function LoginHeading({ title }: LoginHeadingProps) {
  return (
    <h1 className="mb-3 font-normal text-xl leading-7 tracking-normal text-[#020618] text-center login:text-left">
      {title}
    </h1>
  );
}

export default LoginHeading;
