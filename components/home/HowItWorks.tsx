import { Search, Send, TrendingUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

const HowItWorks = () => {
  return (
    <section className="flex flex-col gap-6 mt-6 items-center sm:items-start px-4 sm:px-8">
      <div className="text-center sm:text-left">
        <h1>Finding your next job is simple</h1>
        <p>Three simple steps to move your career forward.</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 w-full">
        <Card className="shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-4">
              <span className="rounded-lg bg-blue-50 p-2.5">
                <Search className="w-4 h-4 md:w-5 md:h-5 shrink-0 text-blue-600" />
              </span>{" "}
              Discover
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Explore opportunities that match your interests.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-4">
              <span className="rounded-lg bg-blue-50 p-2.5">
                <Send className="w-4 h-4 md:w-5 md:h-5 shrink-0 text-blue-600" />
              </span>{" "}
              Apply
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Submit your application and connect with employers.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-4">
              <span className="rounded-lg bg-blue-50 p-2.5">
                <TrendingUp className="w-4 h-4 md:w-5 md:h-5 shrink-0 text-blue-600" />
              </span>{" "}
              Grow
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Take the next step in your professional journey.
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default HowItWorks;
