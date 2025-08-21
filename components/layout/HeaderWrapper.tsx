// app/HeaderWrapper.tsx (Server Component)
import { getUserData } from "@/lib/getUserData";
import Header from "./Header";

export default async function HeaderWrapper() {
  const user = await getUserData(); 
  console.log("user in server side header ->> ", user)
  return <Header user={user} />;
}
