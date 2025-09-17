
import { BarcodeScanner, type DetectedBarcode } from 'react-barcode-scanner'
import "react-barcode-scanner/polyfill"
import { useEffect, useState } from 'react';
import { loggerDialog, LoggerDialogState } from '@/atoms/loggerDialog';
import { useAtom } from 'jotai';

export default function Scanner() {
    const [paused, setPaused] = useState(false);
    const [state, setState] = useAtom(loggerDialog)

    const onCapture = (barcodes: DetectedBarcode[]) => {
        setState({ ...state, state: LoggerDialogState.FOOD_ITEM, metadata: { ...state.metadata, barcode: barcodes[0].rawValue } });
    };

    useEffect(() => {
        setPaused(false);
        return () => {
            setPaused(true);
        };
    }, []);

    return (
        <div className="h-screen">
            <div className="w-full h-[60vh] relative">
                <div className="absolute top-0 left-0 w-full h-full">
                    <div className="w-full h-full flex justify-center items-center">
                        <div className="w-[80%] h-[60%] aspect-square border-2 border-white/50 outline outline-[15vh] outline-black/50 flex justify-center items-center">
                        </div>
                    </div>
                </div>
                <BarcodeScanner
                    paused={paused}
                    trackConstraints={{ advanced: [{ aspectRatio: 16 / 9 }] }}
                    options={{
                        formats: [
                            'code_128',
                            'code_39',
                            'ean_13',
                            'ean_8',
                            'upc_a',
                            'upc_e',
                            'code_93',
                            'codabar',
                            'itf',
                            'qr_code'
                        ]
                    }}
                    onCapture={onCapture} />
            </div>
        </div>
    )
}