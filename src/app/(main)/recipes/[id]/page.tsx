import { Badge } from "@/components/ui/badge";
import { Card, CardDescription } from "@/components/ui/card";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="flex flex-col items-center justify-center">
      <Card className="mx-auto w-full max-w-3xl">
        <CardDescription className="text-4xl mx-auto">🍽️</CardDescription>
      </Card>
      <div className="flex flex-wrap gap-2 mt-4">
        <Badge className="px-3 py-1 text-sm" variant="secondary">
          Italian
        </Badge>
        <Badge className="px-3 py-1 text-sm" variant="secondary">
          30 min
        </Badge>
        <Badge className="px-3 py-1 text-sm" variant="secondary">
          4 servings
        </Badge>
      </div>
    </div>
  );
}
