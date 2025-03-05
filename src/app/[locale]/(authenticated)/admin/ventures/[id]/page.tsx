'use client'

import { CardBalance } from '@/components/cards/card-balances'
import { Loading } from '@/components/loading/loading'
import { ResumeTab } from '@/components/tabs-enterprise/overview'
import { useEnterpriseContext } from '@/context/enterprise-context'
import api from '@/lib/api'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import 'rc-slider/assets/index.css'
import { useEffect, useState } from 'react'

interface ImageData {
  id: number
  url: string
}

export default function VentureDetailsPage() {
  const t = useTranslations('TextLang')
  const { id } = useParams() as { id: string }

  const {
    currentEnterprise,
    setCurrentEnterprise,
  } = useEnterpriseContext()

  const [images, setImages] = useState<ImageData[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingImages, setLoadingImages] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('resumo')
  // const [orderType, setOrderType] = useState<'market' | 'limit'>('market')
  // const [shares, setShares] = useState<string>('')
  // const [sharePrice, setSharePrice] = useState<string>('')
  // const [propertyValue, setPropertyValue] = useState<string>('')
  // const [sliderValue, setSliderValue] = useState<number>(0)


  useEffect(() => {
    async function fetchOneEnterprise() {
      try {
        const response = await api.get(`/admin/enterprise/${id}`)
        setCurrentEnterprise(response.data.enterprise) // atualiza no contexto
        setLoading(false)
      } catch (err) {
        setError('Erro ao buscar empreendimento.')
        setLoading(false)
      }
    }

  
    if (!currentEnterprise || currentEnterprise.id !== Number(id)) {
      fetchOneEnterprise()
    } else {
    
      setLoading(false)
    }
  }, [id, currentEnterprise, setCurrentEnterprise])


  useEffect(() => {
    if (currentEnterprise) {
      const fetchImages = async () => {
        try {
          const response = await api.get(
            `/admin/enterprise/images/${currentEnterprise.id}`,
          )
          setImages(response.data.images)
        } catch (err) {
          console.error(err)
        } finally {
          setLoadingImages(false)
        }
      }
      fetchImages()
    }
  }, [currentEnterprise])

  if (loading || loadingImages) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading loading width={300} />
      </div>
    )
  }

  if (error) return <p>{error}</p>
  if (!currentEnterprise) return <p>{t('ventureNotFound')}</p>


  const venture = currentEnterprise

  

  return (
    <div className="container mx-auto w-full bg-gray px-10 py-5 rounded-lg antialiased text-textPrimary ">
     
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="w-full md:w-[40%]">
          
          <p className="text-lg font-bold text-[#727272] mb-2">
            {venture.name}
          </p>
          <h1 className="text-4xl font-bold">
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
            }).format(venture.fundingAmount)}
          </h1>
        </div>
        <div className="grid grid-cols-2 md:flex md:gap-4 md:w-full">
          <CardBalance
            title="Valor da cota"
            value={venture?.fractionalSale?.quotaPrice}
            icon="up"
          />
          <CardBalance
            title="Total de cotas"
            value={venture?.fractionalSale?.totalQuotas}
            icon="up"
        
          />
            <CardBalance
            title="Total Vendidas"
            value={venture?.fractionalSale?.soldQuotas}
            icon="up"
        
          />
       <CardBalance
  title="Total disponiveis"
  value={(venture?.fractionalSale?.totalQuotas ?? 0) - (venture?.fractionalSale?.soldQuotas ?? 0)}
  icon="up"
/>
        </div>
      </section>

      {/* Tabs */}
      <div className="border-b border-border">
        <div className="flex gap-1">
          {['resumo', 'dados', 'endereco', 'cotas', 'usuarios', 'imagens'].map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-sm font-medium transition-colors
                  ${
                    activeTab === tab
                      ? 'border-t-2 border-r border-l border-border text-textPrimary shadow-t-sm'
                      : 'text-[#727272] hover:text-primary hover:bg-gray-50'
                  } 
                  rounded-t-lg relative top-[1px]`}
              >
                {t(`abas.${tab}`) || tab.toUpperCase()}
              </button>
            ),
          )}
        </div>
      </div>

      <div className="bg-primary order-r border-l border-b border-border">
 
        {activeTab === 'resumo' && <ResumeTab venture={venture} />}

       
        {activeTab === 'imagens' && images.length > 0 && (
          <div className="grid grid-cols-2 gap-px rounded-lg">
            <div className="col-span-1 row-span-2 mr-4">
              <Image
                src={images[0].url}
                alt={`Imagem de capa do empreendimento ${venture.name}`}
                width={600}
                height={600}
                className="object-cover w-full h-full rounded-tl-lg rounded-bl-lg border-border border"
              />
            </div>
            <div className="grid grid-cols-2 grid-rows-2 gap-4">
              {images.slice(1, 5).map((img, index) => {
                const isLastImage = index === 3 && images.length > 5
                return (
                  <div key={img.id} className="relative">
                    <Image
                      src={img.url}
                      alt={`Imagem ${index + 2} do empreendimento ${venture.name}`}
                      width={300}
                      height={300}
                      className="object-cover w-full h-full border border-border"
                    />
                    {isLastImage && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="text-white text-xl font-bold">
                          +{images.length - 5}
                        </span>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Aba DADOS */}
        {activeTab === 'dados' && (
          <div className="bg-primary p-6 rounded-xl shadow-lg">
            <form className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-[0.80rem] mb-2 font-normal text-[#696969]"
                >
                  Nome do Empreendimento
                </label>
                <input
                  type="text"
                  id="name"
                  defaultValue={venture.name}
                  className="mt-1 block w-full h-10 rounded-md border-[0.001rem] border-border bg-input  p-2 shadow-sm focus:outline-none focus:border-yellow-400"
                />
              </div>
              <div>
                <label
                  htmlFor="corporateName"
                  className="block text-[0.80rem] mb-2 font-normal text-[#696969]"
                >
                  Razão Social
                </label>
                <input
                  type="text"
                  id="corporateName"
                  defaultValue={venture.corporateName}
                  className="mt-1 block w-full h-10 rounded-md border-[0.001rem] border-border bg-input  p-2 shadow-sm focus:outline-none focus:border-yellow-400"
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-[0.80rem] mb-2 font-normal text-[#696969]"
                >
                  Descrição
                </label>
                <input
                  type="text"
                  id="description"
                  defaultValue={venture.description}
                  className="mt-1 block w-full h-10 rounded-md border-[0.001rem] border-border bg-input  p-2 shadow-sm focus:outline-none focus:border-yellow-400"
                />
              </div>
              <div>
                <label
                  htmlFor="status"
                  className="block text-[0.80rem] mb-2 font-normal text-[#696969]"
                >
                  Status
                </label>
                <input
                  type="text"
                  id="status"
                  defaultValue={venture.status}
                  className="mt-1 block w-full h-10 rounded-md border-[0.001rem] border-border bg-input  p-2 shadow-sm focus:outline-none focus:border-yellow-400"
                />
              </div>
              <div>
                <label
                  htmlFor="investmentType"
                  className="block text-[0.80rem] mb-2 font-normal text-[#696969]"
                >
                  Investimento
                </label>
                <input
                  type="text"
                  id="investmentType"
                  defaultValue={venture.investmentType}
                  className="mt-1 block w-full h-10 rounded-md border-[0.001rem] border-border bg-input  p-2 shadow-sm focus:outline-none focus:border-yellow-400"
                />
              </div>
              <div>
                <label
                  htmlFor="constructionType"
                  className="block text-[0.80rem] mb-2 font-normal text-[#696969]"
                >
                  Tipo de Construção
                </label>
                <input
                  type="text"
                  id="constructionType"
                  defaultValue={venture.constructionType}
                  className="mt-1 block w-full h-10 rounded-md border-[0.001rem] border-border bg-input  p-2 shadow-sm focus:outline-none focus:border-yellow-400"
                />
              </div>
              <div>
                <label
                  htmlFor="fundingAmount"
                  className="block text-[0.80rem] mb-2 font-normal text-[#696969]"
                >
                  Valor do Funding
                </label>
                <input
                  type="text"
                  id="fundingAmount"
                  defaultValue={venture.fundingAmount}
                  className="mt-1 block w-full h-10 rounded-md border-[0.001rem] border-border bg-input  p-2 shadow-sm focus:outline-none focus:border-yellow-400"
                />
              </div>
              <div>
                <label
                  htmlFor="transferAmount"
                  className="block text-[0.80rem] mb-2 font-normal text-[#696969]"
                >
                  Valor Transferido
                </label>
                <input
                  type="text"
                  id="transferAmount"
                  defaultValue={venture.transferAmount}
                  className="mt-1 block w-full h-10 rounded-md border-[0.001rem] border-border bg-input  p-2 shadow-sm focus:outline-none focus:border-yellow-400"
                />
              </div>
              <div>
                <label
                  htmlFor="postalCode"
                  className="block text-[0.80rem] mb-2 font-normal text-[#696969]"
                >
                  CEP
                </label>
                <input
                  type="text"
                  id="postalCode"
                  defaultValue={venture.postalCode}
                  className="mt-1 block w-full h-10 rounded-md border-[0.001rem] border-border bg-input  p-2 shadow-sm focus:outline-none focus:border-yellow-400"
                />
              </div>
              <div>
                <label
                  htmlFor="stateCity"
                  className="block text-[0.80rem] mb-2 font-normal text-[#696969]"
                >
                  Estado / Cidade
                </label>
                <input
                  type="text"
                  id="stateCity"
                  defaultValue={`${venture.state} ${venture.city}`}
                  className="mt-1 block w-full h-10 rounded-md border-[0.001rem] border-border bg-input  p-2 shadow-sm focus:outline-none focus:border-yellow-400"
                />
              </div>
              <div>
                <label
                  htmlFor="squareMeterValue"
                  className="block text-[0.80rem] mb-2 font-normal text-[#696969]"
                >
                  Valor por m²
                </label>
                <input
                  type="text"
                  id="squareMeterValue"
                  defaultValue={venture.squareMeterValue}
                  className="mt-1 block w-full h-10 rounded-md border-[0.001rem] border-border bg-input  p-2 shadow-sm focus:outline-none focus:border-yellow-400"
                />
              </div>
              <div>
                <label
                  htmlFor="floors"
                  className="block text-[0.80rem] mb-2 font-normal text-[#696969]"
                >
                  Andares
                </label>
                <input
                  type="text"
                  id="floors"
                  defaultValue={venture.floors}
                  className="mt-1 block w-full h-10 rounded-md border-[0.001rem] border-border bg-input  p-2 shadow-sm focus:outline-none focus:border-yellow-400"
                />
              </div>
              <div>
                <label
                  htmlFor="commercializationType"
                  className="block text-[0.80rem] mb-2 font-normal text-[#696969]"
                >
                  Tipo de Comercialização
                </label>
                <input
                  type="text"
                  id="commercializationType"
                  defaultValue={venture.commercializationType}
                  className="mt-1 block w-full h-10 rounded-md border-[0.001rem] border-border bg-input  p-2 shadow-sm focus:outline-none focus:border-yellow-400"
                />
              </div>
            </form>
          </div>
        )}

        {activeTab === 'endereco' && (
          <div className="p-6">
            <p>Conteúdo do Endereço</p>
          </div>
        )}
        {activeTab === 'cotas' && (
          <div className="p-6">
            <p>Conteúdo das Cotas</p>
          </div>
        )}
        {activeTab === 'usuarios' && (
          <div className="p-6">
            <p>Conteúdo dos Usuários</p>
          </div>
        )}
      </div>
    </div>
  )
}
