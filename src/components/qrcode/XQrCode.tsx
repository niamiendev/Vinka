import QRCode from 'react-native-qrcode-svg';


type Props = {
    size?: number
}

export const XQrcode = (
    { size = 150 }: Props
) => {

    const data = {}
    const json_data = JSON.stringify(data)

    return (
        <QRCode
            value={json_data}
            size={size}
        />
    )

}