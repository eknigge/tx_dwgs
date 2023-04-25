import Image from "next/image"
import logo from 'public/images/Snohomish_County_Public_Utility_District_logo.svg'
import Dropdown from "./Dropdown"

const Header = () => {
  return (
    <header className="header">
      <Image
        src={logo}
        width={200}
        height={110}
      />
      <Dropdown />
      <h1>Transmission Drawings</h1>
    </header>
  )
}

export default Header
