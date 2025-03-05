import Image from 'next/image'
import IconDownUrl from '../../../public/images/svg/arrowdownbalancedown.svg'
import IconUpUrl from '../../../public/images/svg/arrowdownbalanceup.svg'

type IpropsValuesCard = {
  title: string
  value: string | number | undefined
  icon: 'up' | 'down'
}

export function CardBalance({
  title,
  value,
  icon,
}: IpropsValuesCard) {
  // Verifica o tipo de value e formata se for string
  let displayedValue = ''
  if (typeof value === 'string') {
    displayedValue = Number(value).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    })
  } else if (typeof value === 'number') {
    displayedValue = value.toString()
  }

  return (
    <main className="bg-primary p-4 rounded-lg border border-border w-full antialiased">
      <section className="flex flex-col justify-between">
        <div className="flex flex-row items-center justify-between mb-4">
          <h1 className="font-normal text-[0.80rem] text-[#868686]">{title}</h1>
          <div>
            {icon === 'up' ? (
              <Image src={IconUpUrl} alt="Up Icon" width={10} height={10} />
            ) : (
              <Image src={IconDownUrl} alt="Down Icon" width={10} height={10} />
            )}
          </div>
        </div>
        <p className="text-[0.90rem] text-textPrimary">{displayedValue}</p>
      </section>
    </main>
  )
}
