interface LoginHeadingProps {
  title: string;
  description?: string;
}

function LoginHeading({ title, description }: LoginHeadingProps) {
  return (
    <h1 className="mb-3 font-normal text-xl leading-7 tracking-normal text-[#020618] text-center login:text-left">
      {title}
      {description ? (
        <>
          <br />
          <span className="text-base leading-6 text-[#6D6E71]">
            {description}
          </span>
        </>
      ) : null}
    </h1>
  );
}

export default LoginHeading;
