import AsideLinks from '../../components/first/AsideLinks'

export default function BoardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <section className="flex justify-between w-full">
      {/* Include shared UI here e.g. a header or sidebar */}
      <AsideLinks />
      <main className="flex-1">{children}</main>

      <div className="relative w-64 hidden lg:block mr-3 xl:mr-8">
        <div className="fixed my-3 border-2 border-slate-500 p-3 rounded-lg w-64">
          <h1>hola</h1>
        </div>
      </div>
    </section>
  )
}
