import Image from "next/image"
import logo from 'public/images/Snohomish_County_Public_Utility_District_logo.svg'
import Dropdown from "./Dropdown"

const Header = () => {
  return (
    <header className="header">
  <div className="image-container">
      <Image
        src={logo}
        width={200}
        height={110}
        alt="Snohomish PUD Logo"
        priority
        className="header-image"
      />
      </div>
      <Dropdown />
      <h1>Transmission Drawings</h1>
    </header>
  )
}

export default Header
