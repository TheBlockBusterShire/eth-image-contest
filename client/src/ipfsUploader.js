import { create } from 'ipfs-http-client'

export const uploadToIpfs = async (file) => {
    const client = create('https://localhost:5001')
    try {
        console.log("IPFS: START uploading")
        const uploadedFile = await client.add(file)
        console.log("IPFS: FINISH uploading")
        return uploadedFile.path
    } catch(error) {
        console.log('IPFS: Error ', error)
    }
}
