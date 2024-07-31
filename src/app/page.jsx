
import Introduction from "./components/Introduction";
import { revalidatePath } from 'next/cache'

export default function Home() {

  revalidatePath('/')

  return (
    <Introduction/>
  );
}
