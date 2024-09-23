import image from "../assets/Pok-dex-21-09-2024.png";
export default function Header() {
  return (
    <>
      <div className="bg-[#e40726] ">
        <img
          src={image}
          alt="Pokemon logo"
          className="object-contain m-auto md:h-[15vh] h-[10vh]"
        />
      </div>
     
    </>
  );
}
