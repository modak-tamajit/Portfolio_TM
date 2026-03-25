import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Tamajit Modak — Systems Programmer & Builder';
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
                {/* Accent glow */}
                <div
                    style={{
                        position: 'absolute',
                        top: '-20%',
                        left: '30%',
                        width: '600px',
                        height: '400px',
                        borderRadius: '50%',
                        background: 'rgba(124, 106, 247, 0.08)',
                        filter: 'blur(100px)',
                    }}
                />

                {/* Name */}
                <div
                    style={{
                        fontSize: '72px',
                        fontWeight: 800,
                        background: 'linear-gradient(135deg, #e4e4f0, #a899ff, #7c6af7)',
                        backgroundClip: 'text',
                        color: 'transparent',
                        lineHeight: 1.1,
                        textAlign: 'center',
                    }}
                >
                    TAMAJIT MODAK
                </div>

                {/* Subtitle */}
                <div
                    style={{
                        fontSize: '24px',
                        color: '#5a5a7a',
                        marginTop: '16px',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        fontWeight: 400,
                    }}
                >
                    Systems Programmer & Builder
                </div>

                {/* Bottom accent line */}
                <div
                    style={{
                        width: '120px',
                        height: '3px',
                        background: 'linear-gradient(90deg, #7c6af7, #00ff88)',
                        borderRadius: '2px',
                        marginTop: '32px',
                    }}
                />
            </div>
        ),
        { ...size }
    );
}
