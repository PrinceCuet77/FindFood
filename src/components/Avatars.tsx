import { Label } from '@radix-ui/react-label'
import { avatars } from '../lib/data'
import { useState } from 'react'

const Avatars = () => {
  const [isSelected, setIsSelected] = useState<string | null>(null)

  const onSelectAvatar = (id: string) => {
    // console.log(id)
    setIsSelected(id)
  }

  return (
    <div className='mt-2'>
      <Label className='font-[500] text-sm'>Choose Your Avatar</Label>
      <section className='flex gap-2'>
        {avatars.map((avatar) => (
          <ul key={avatar.id}>
            <li
              className='cursor-pointer'
              onClick={() => onSelectAvatar(avatar.id)}
            >
              <img
                className={`w-12 h-12 ${
                  isSelected === avatar.id && 'ring-2 ring-blue-700 rounded-full'
                }`}
                {...avatar.image}
              />
            </li>
          </ul>
        ))}
      </section>
    </div>
  )
}

export default Avatars
