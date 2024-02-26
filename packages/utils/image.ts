export const toDataURL = (url: string, callback: (data: string | ArrayBuffer | null) => void) => {
  let xhRequest = new XMLHttpRequest()
  xhRequest.onload = function () {
    let reader = new FileReader()
    reader.onloadend = function () {
      callback(reader.result)
    }
    reader.readAsDataURL(xhRequest.response)
  }
  xhRequest.open('GET', url)
  xhRequest.responseType = 'blob'
  xhRequest.send()
}

export const base64ToFile = (base64: string, fileName: string) => {
  const type = base64.split(';base64,')[0].replace('data:', '')
  const blob = new Blob([base64], { type })
  return new File([blob], fileName, { type })
}

export const fileToBase64 = (file: File) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      typeof reader.result === 'string' && resolve(reader.result.replace('data:image/webp;base64,', ''))
    }
    reader.onerror = reject
  })
}
