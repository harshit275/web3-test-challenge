import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ethers } from 'ethers'
import contractABI from '../ContractABI.json'
import Layout from '../components/Layout'

const IndexPage = () => {
  const [error, setError] = useState()
  const [contractInfo, setContractInfo] = useState({
    address: "0xc7a7981FEF557524F993E6DC9419138c52f3f1A5",
    tokenName: "-",
    tokenSymbol: "-",
    totalSupply: "-"
  })

  useEffect(() => {
    async function getContractData() {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const erc20 = new ethers.Contract(contractInfo.address, contractABI, provider)

      const tokenName = await erc20.name()
      const tokenSymbol = await erc20.symbol()
      const totalSupply = await erc20.totalSupply()

      setContractInfo({
        address: "-",
        tokenName,
        tokenSymbol,
        totalSupply
      })
    }

    getContractData()
  }, []);
  console.log(contractInfo)
  

  return (
    <Layout title="Decubate | Coding Challange">
      <h1>Hello Next.js</h1>
      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
      </p>
    </Layout>
  )
}

export default IndexPage
