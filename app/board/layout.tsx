import AsideLinks from '../../components/first/(components)/AsideLinks'

export default function BoardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <AsideLinks />
      <main>{children}</main>
    </section>
  )
}
