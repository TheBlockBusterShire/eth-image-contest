import { create } from 'ipfs-http-client'

const IPFS_URL = "http://localhost:5001"

const client = create(IPFS_URL)

export const uploadToIpfs = async (file) => {
    try {
        console.log(`IPFS: START uploading filename: ${file.name}`)
        const uploadedFile = await client.add(file)
        console.log(`IPFS: FINISH uploading path: ${uploadedFile.path}`)
        return uploadedFile.path
    } catch(error) {
        console.log('IPFS: Error ', error)
    }
}
