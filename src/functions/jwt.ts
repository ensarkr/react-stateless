import { userT } from "../context/UserContext";

const decodeJWTPayload = (JWT: string) => {
  try {
    const encodedPayload = JWT.split(".")[1];

    const binaryString = atob(encodedPayload);

    const textDecoder = new TextDecoder("utf-8");
    const resultString = textDecoder.decode(
      new Uint8Array([...binaryString].map((char) => char.charCodeAt(0)))
    );
    return JSON.parse(resultString) as userT;
  } catch {
    console.error("jwt is tampered");
    return null;
  }
};

export { decodeJWTPayload };
