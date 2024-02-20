function NavbarComponent() {
  return (
    <div className="w-full h-14 flex items-center justify-between px-3 py-4 border-b border-b-gray-400">
      <div>
        <h1 className="text-2xl text-primary font-bold">FluentFly AI</h1>
      </div>
      <button className="bg-primary px-3 py-2 text-gray-50 text-base rounded-lg">
        Sign In
      </button>
    </div>
  );
}

export default NavbarComponent;
