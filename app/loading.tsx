import { TwinOrbit } from "@/components/ui/TwinOrbit";

export default function loading() {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <TwinOrbit className="size-6 text-[var(--primary)]" />
        </div>
    );
}