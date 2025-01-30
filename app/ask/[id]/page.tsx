export default function page({ params }: { params: { id: string } }) {
  const id = (await params).id
  return <div>{id}</div>
}
