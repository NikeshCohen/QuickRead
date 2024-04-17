function Hero() {
  return (
    <header className="w-full justify-center items-center flex flex-col">
      <nav className="flex justify-between items-center w-full mb-10 pt-3">
        <img src="/logo.png" className="w-36 object-contain" />
      </nav>

      <h1 className="head_text">
        <span className="blue_gradient">Simplify</span> Your{" "}
        <br className="max-md:hidden" /> Reading with QuickRead
      </h1>

      <h2 className="desc">
        Unlock a new level of efficiency and comprehension with QuickRead, your
        AI-powered article summarization tool. Spend less time reading and more
        time understanding, with summaries that capture the essence of the text
        in seconds
      </h2>
    </header>
  );
}

export default Hero;
