import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'About — Tamajit Modak';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #0a0a0f 0%, #111118 50%, #0a0a0f 100%)',
                    fontFamily: 'sans-serif',
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        top: '-15%',
                        right: '20%',
                        width: '500px',
                        height: '400px',
                        borderRadius: '50%',
                        background: 'rgba(0, 255, 136, 0.06)',
                        filter: 'blur(100px)',
                    }}
                />

                <div
                    style={{
                        fontSize: '28px',
                        color: '#00ff88',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        marginBottom: '12px',
                    }}
                >
                    01 / About
                </div>

                <div
                    style={{
                        fontSize: '64px',
                        fontWeight: 800,
                        background: 'linear-gradient(135deg, #e4e4f0, #a899ff)',
                        backgroundClip: 'text',
                        color: 'transparent',
                        lineHeight: 1.15,
                        textAlign: 'center',
                    }}
                >
                    A curious mind
                </div>
                <div
                    style={{
                        fontSize: '64px',
                        fontWeight: 800,
                        background: 'linear-gradient(135deg, #a899ff, #7c6af7)',
                        backgroundClip: 'text',
                        color: 'transparent',
                        lineHeight: 1.15,
                    }}
                >
                    with a C compiler.
                </div>

                <div
                    style={{
                        fontSize: '18px',
                        color: '#5a5a7a',
                        marginTop: '24px',
                        maxWidth: '600px',
                        textAlign: 'center',
                    }}
                >
                    Bengali systems programmer. Builds OSes before resumés.
                </div>
            </div>
        ),
        { ...size }
    );
}
