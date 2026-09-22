import { TwinOrbit } from "@/components/ui/TwinOrbit";

export default function loading() {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <TwinOrbit className="lg:size-6 size-3 text-[var(--primary)]" />
        </div>
    );
}