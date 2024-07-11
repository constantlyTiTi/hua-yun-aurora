
import Introduction from "./components/Introduction";
import { getIntroduction } from "./api/useContentful";

export default async function Home() {

  const intro = await getIntroduction()

  const settings = intro?.data?.items[0]?.fields

  return (
    settings &&
    <Introduction introduction={settings}/>
  );
}
