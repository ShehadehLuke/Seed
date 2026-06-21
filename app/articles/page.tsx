import { Love_Ya_Like_A_Sister } from "next/font/google"

const love_ya = Love_Ya_Like_A_Sister({
    weight: "400",
})


export default function Page() {
    return (
        <div className="flex flex-col items-center justify-center h-[90vh] w-full">
            <main className={`bg-card h-[80vh] w-2/3 p-8 rounded-xl ${love_ya.className}`}>
                <h1 className="text-2xl">Articles</h1>
                <p>No articles yet. Check back later!</p>
            </main>
        </div>
    )
}