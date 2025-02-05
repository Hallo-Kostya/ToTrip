import Form from "@/components/ui/main-page/form/form";

export default function Page() {
    return (
        <div
            className="flex justify-center items-center bg-cover bg-center"
            style={{
                minHeight: 'calc(100vh - 200px)', // Учитывается 60px для хедера и 40px для футера
                backgroundImage: 'url(/img/common/mountains.jpg)',
            }}
        >
            <Form />
        </div>

    );
}

