import Image from "next/image";

export default function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "3rem" }}>
      <h1 style={{color: "white"}}>404</h1>
      <h2 style={{color: "white", marginBottom: "1rem"}}>Estamos trabalhando nessa pagina no momento!!!</h2>
      <Image src="/irgor.png" alt="igor" width={400} height={400}/>
    </div>
  );
}