import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function SidebarOptInForm() {
  return (
    <Card className=" ">
      <form>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm bm-8">გამოსცადე</CardTitle>
          <CardDescription>
                საინტერესო სიახლეები ახლო მომავალში
          </CardDescription>
        </CardHeader>
    
      </form>
    </Card>
  )
}
