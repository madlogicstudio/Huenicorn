'use client'

type InfoCardProps = {
    content: any;
}

function InfoCard({content}: InfoCardProps) {
    return (
        <div className="card-pop bg-[var(--card)] border border-foreground/20 p-6 flex flex-col gap-3 text-[#171717]
            lg:max-w-[320px] w-full absolute top-8 right-0 rounded-lg backdrop-blur-sm shadow-xl z-20">
            {content}
        </div>
    )
}

export default InfoCard