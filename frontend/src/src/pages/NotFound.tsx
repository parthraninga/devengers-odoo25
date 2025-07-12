
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Home, ArrowLeft, Search, Package } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
      <div className="container-padding max-w-2xl mx-auto text-center">
        <Card className="glass border-white/20 p-8">
          <CardContent className="space-y-8">
            {/* 404 Animation */}
            <div className="relative">
              <div className="text-8xl font-bold text-gradient opacity-20">404</div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 gradient-primary rounded-full flex items-center justify-center animate-bounce">
                  <Package className="h-12 w-12 text-white" />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-4">
              <h1 className="text-4xl font-display font-bold text-gradient">
                Page Not Found
              </h1>
              <p className="text-xl text-muted-foreground max-w-md mx-auto">
                Oops! The page you're looking for seems to have wandered off into the fashion void.
              </p>
              <p className="text-muted-foreground">
                Don't worry, there are plenty of amazing items to discover on ReWear!
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button className="gradient-primary text-white hover:opacity-90 w-full sm:w-auto">
                  <Home className="h-4 w-4 mr-2" />
                  Go Home
                </Button>
              </Link>
              
              <Link to="/browse">
                <Button variant="outline" className="w-full sm:w-auto">
                  <Search className="h-4 w-4 mr-2" />
                  Browse Items
                </Button>
              </Link>
              
              <Button 
                variant="ghost" 
                onClick={() => window.history.back()}
                className="w-full sm:w-auto"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Go Back
              </Button>
            </div>

            {/* Fun Facts */}
            <div className="pt-8 border-t border-white/10">
              <p className="text-sm text-muted-foreground">
                💡 <span className="font-medium">Fun fact:</span> While you're here, did you know that fashion swapping can reduce textile waste by up to 80%?
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotFound;
