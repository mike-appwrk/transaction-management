import logo from '../icons/logo.svg';

function SidebarHeader () {
  return (
    <div className="">
      <header>
        <h1 className="flex gap-4 items-center mb-10">
          <img src={logo} alt="logo"/>
          <span className="font-bold uppercase">Transactions</span>
        </h1>
      </header>
    </div>
  )
}

export default SidebarHeader;
