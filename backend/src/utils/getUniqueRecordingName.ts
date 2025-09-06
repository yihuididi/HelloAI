import Recording from '../models/recording.model.js';

export const getUniqueRecordingName = async (userId: string): Promise<string> => {
  const baseName = 'New Recording';
  const existingNames = await Recording.find({
    userId,
    name: { $regex: `${baseName}( \\d+)?$` }
  }).select('name');

  const usedNumbers = new Set<number>();
  existingNames.forEach(doc => {
    const match = doc.name.match(/^New Recording(?: (\d+))?$/);
    if (!match) return;
    const num = match[1] ? parseInt(match[1], 10) : 1;
    usedNumbers.add(num);
  });

  let suffix = '';
  for (let i = 1; i <= usedNumbers.size + 1; i++) {
    if (!usedNumbers.has(i)) {
      suffix = i === 1 ? '' : ` ${i}`;
      break;
    }
  }

  return `${baseName}${suffix}`;
};