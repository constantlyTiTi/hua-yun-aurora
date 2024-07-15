
import Introduction from "./components/Introduction";
import { getIntroduction } from "./api/getContentful";

export default async function Home() {

  const intro = await getIntroduction()

  const introduction = intro?.data?.items[0]?.fields

  return (
    introduction &&
    <Introduction introduction={introduction}/>
  );
}
