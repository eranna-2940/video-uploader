let isConfigUpdate = false;

async function uploadToS3Bucket(stream, credential, cd) {

    try {
        if (!window.AWS) {
            return
        }
        if (!isConfigUpdate) {
            window.AWS.config.update(({ region: credential.region }));
            isConfigUpdate = true;
        }

        let s3 = new window.AWS.S3({
            credentials: new window.AWS.Credentials({
                apiVersion: 'latest',
                accessKeyId: credential.accressKeyId,
                secretAccessKey: credential.secretAccessKey,
                signatureVersion: credential.signatureVersion,
                region: credential.region,
                Bucket: credential.Bucket
            })
        });

        var extent = document.getElementById("fileToUpload").files[0].name;
        
        let uploadItem = await s3.upload({
            Bucket: credential.Bucket,
            Key: extent,// name for the bucket file
            ContentType: document.getElementById("fileToUpload").files[0].type,
            Body: stream
        }).on("httpUploadProgress", function (progress) {
            console.log("progress=>", progress)
            cd(getUploadingProgress(progress.loaded, progress.total));
        }).promise();
        console.log("uploadItem=>", uploadItem)
        alert(`File Uploaded successfully to AWS`);
        return uploadItem;
    }
    catch (error) {
        console.log(error)
    }

}

function getUploadingProgress(uploadSize, totalSize) {
    let uploadProgress = (uploadSize / totalSize) * 100;
    return Number(uploadProgress.toFixed(0));
}

export default async function uploadMedia() {
    try {
        let credentialRequest = {
            accressKeyId: '',        // Access key ID here
            secretAccessKey: '',    // Secret Access key here
            signatureVersion: 'v4',
            region: 'ap-south-1',
            Bucket: 'mp4-avi-uploader'
        };
        let mediaStreamRequest = getFile(document.getElementById("fileToUpload").files[0])
        const [mediaStream] = await Promise.all([
            mediaStreamRequest
        ])
        await uploadToS3Bucket(mediaStream, credentialRequest, (progress) => {
            console.log(progress)
        })
    }
    catch {
        alert('Please select file to upload');
    }
}

async function getFile(file) {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onload = (e) => {
            resolve(e.target.result);
        };
        reader.onerror = (err) => {
            reject(false);
        };
        reader.readAsArrayBuffer(file);
    });
};
