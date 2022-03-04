import { useEffect, useState } from 'react'
import { ethers, BigNumberish } from 'ethers'
import { commify, formatUnits } from 'ethers/lib/utils'
import erc20ABI from '../abi/erc20.abi.json'
import stakingABI from '../abi/staking.abi.json'
import Layout from '../components/Layout'

const IndexPage = () => {
  const stakingAddress = "0xc7a7981FEF557524F993E6DC9419138c52f3f1A5"
  const [error, setError] = useState()
  const [contractInfo, setContractInfo] = useState({
    address: "-",
    tokenName: "-",
    tokenSymbol: "-",
    totalSupply: "-"
  })
  const [stakeInfo, setStakeInfo] = useState([])

  useEffect(() => {
    async function getContractData() {
      const provider = new ethers.providers.Web3Provider((window as any).ethereum)
      const staking = new ethers.Contract(stakingAddress, stakingABI, provider)

      try {
        const response = await staking.getPools()
        const token = response[0].token
        const erc20 = new ethers.Contract(token, erc20ABI, provider)
        const tokenName = await erc20.name()
        const tokenSymbol = await erc20.symbol()
        const totalSupply = await erc20.totalSupply()

        setStakeInfo(response)
        setContractInfo({
          address: token,
          tokenName,
          tokenSymbol,
          totalSupply
        })
        console.log(response)
      } catch (error) {
        console.error(error)
      }
    }
    console.log(contractInfo)

    getContractData()
  }, [])

  function convertTimestamp(unix_timestamp: any): string {
    let date = new Date(unix_timestamp * 1000)
    // let hours = date.getHours()
    // let minutes = "0" + date.getMinutes()
    // let seconds = "0" + date.getSeconds()
    // let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2)

    return date.toISOString().slice(0, 19).replace('T', ' ')
  }

  function parseBalance(balance: BigNumberish, decimals = 18, decimalsToDisplay = 2): string {
    return commify(Number(formatUnits(balance, decimals)).toFixed(decimalsToDisplay));
  }

  return (
    <Layout title="Decubate | Coding Challange">
      <h1>Hello Next.js</h1>
      <h1 className="text-3xl font-bold underline ml-4">
        Active Pools
      </h1>
      <div className='m-5'>
        <div className='not-prose relative bg-slate-50 rounded-xl overflow-hidden dark:bg-slate-800/25'>
          <div className='relative rounded-xl overflow-auto'>
            <div className='shadow-sm overflow-hidden my-8'>
              <table className="border-collapse table-auto w-full text-sm">
                <thead>
                  <tr>
                    <th className='border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left'>Pools</th>
                    <th className='border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left'>Reward</th>
                    <th className='border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left'>NFT</th>
                    <th className='border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left'>Capacity</th>
                    <th className='border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left'>Stake</th>
                    <th className='border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left'>Lock Date</th>
                    <th className='border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left'></th>
                  </tr>
                </thead>
                <tbody className='bg-white dark:bg-slate-800'>
                  <tr>
                    <td className='border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400'>DCB/DCB</td>
                    <td className='border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400'>12.75%</td>
                    <td className='border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400'>+2.4%</td>
                    <td className='border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400'>2800000000 DCB</td>
                    <td className='border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400'>0.0 DCB</td>
                    <td className='border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400'>None</td>
                    <td className='border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400'>
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        {'-->'}
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/*  */}
      <div className='m-5'>
        <div className='not-prose relative bg-slate-50 rounded-xl overflow-hidden dark:bg-slate-800/25'>
          <div className='relative rounded-xl overflow-auto'>
            <div className='shadow-sm overflow-hidden my-8'>
              <table className="border-collapse table-auto w-full text-sm">
                <thead>
                  <tr>
                    <th className='border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left'>APY</th>
                    <th className='border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left'>Start Date</th>
                    <th className='border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left'>End Date</th>
                    <th className='border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left'>Hard</th>
                    <th className='border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left'>Locking Period</th>
                    <th className='border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left'>Max</th>
                    <th className='border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left'>Min</th>
                    <th className='border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left'>NFT</th>
                    <th className='border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left'>Token</th>
                    <th className='border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left'>Total</th>
                  </tr>
                </thead>
                <tbody className='bg-white dark:bg-slate-800'>
                  {stakeInfo && stakeInfo.map((stake, id) =>
                    <tr key={id}>
                      <td className='border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400'>
                        {stake.apy.toString() / 10}%
                      </td>
                      <td className='border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400'>
                        {convertTimestamp(stake.startDate)}
                      </td>
                      <td className='border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400'>
                        {convertTimestamp(stake.endDate)}
                      </td>
                      <td className='border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400'>
                        {parseBalance(stake.hardCap)}
                      </td>
                      <td className='border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400'>
                        {stake.lockPeriodInDays.toString()}
                      </td>
                      <td className='border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400'>
                        {parseBalance(stake.maxContrib)}
                      </td>
                      <td className='border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400'>
                        {parseBalance(stake.minContrib)}
                      </td>
                      <td className='border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400'>
                        {stake.nft.toString()}
                      </td>
                      <td className='border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400'>
                        {contractInfo.tokenSymbol}
                      </td>
                      <td className='border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400'>
                        {parseBalance(stake.totalDeposit)}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
