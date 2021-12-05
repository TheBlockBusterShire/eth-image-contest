import { create } from 'ipfs-http-client'

const client = create("https://ipfs.infura.io:5001/api/v0")

const upload = async (file) => {
    try {
        const uploadedFile = await client.add(file)
        return uploadedFile.path
    } catch(error) {
        console.log('IPFS: Error ', error)
    }
}

const getUrl = (path) => {
    return `https://ipfs.infura.io/ipfs/${path}`
}

export default { upload, getUrl }
