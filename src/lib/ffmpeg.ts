import { createFFmpeg, fetchFile, type FFmpeg } from '@ffmpeg/ffmpeg'
let ffmpeg: FFmpeg | null = null
export async function getFFmpeg(){ if(!ffmpeg){ const corePath = new URL('/ffmpeg/ffmpeg-core.js', window.location.origin).toString(); ffmpeg = createFFmpeg({log:true, corePath}) } if(!ffmpeg.isLoaded()) await ffmpeg.load(); return ffmpeg }
export { fetchFile }
