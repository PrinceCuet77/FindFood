import { Label } from './ui/label';
import { avatars } from '../lib/data';

type AvatarProps = {
  isSelected: string | null;
  onSelect: (isSelected: string | null) => void;
};

const Avatars = ({ isSelected, onSelect }: AvatarProps) => {
  return (
    <div className='mt-2'>
      <Label className='font-[500] text-sm'>Choose Your Avatar</Label>
      <section className='flex gap-2'>
        {avatars.map((avatar) => (
          <ul key={avatar.id}>
            <li
              className='cursor-pointer'
              onClick={() => onSelect(avatar.id)}
            >
              <img
                className={`w-12 h-12 ${
                  isSelected === avatar.id &&
                  'ring-2 ring-blue-700 rounded-full'
                }`}
                {...avatar.image}
              />
            </li>
          </ul>
        ))}
      </section>
    </div>
  );
};

export default Avatars;
