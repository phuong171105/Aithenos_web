import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingBag, Search } from "lucide-react";
import { Link } from "react-router-dom";

export function NotFoundPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-background to-primary/20 p-4 text-center">
            <div className="relative mb-8">
                <ShoppingBag className="w-32 h-32 text-primary animate-pulse" />
                <Search className="w-16 h-16 text-secondary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
            <h1 className="text-4xl font-bold mb-4">404 Not Found</h1>
            <p className="text-lg mb-8 max-w-md">
                Oops! It looks like the product you're looking for doesn't exist or is currently out of stock. Please check back later or browse our other items.
            </p>
            <Button asChild className="gap-2">
                <Link to="/">
                    <ArrowLeft className="w-4 h-4" />
                    Return to Home Page
                </Link>
            </Button>
            <p className="mt-8 text-sm text-muted-foreground">
                Can't find what you're looking for? Try exploring our latest collections or search for a different product.
            </p>
        </div>
    );
}
