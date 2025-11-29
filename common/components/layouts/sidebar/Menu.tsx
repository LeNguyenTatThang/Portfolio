import { MenuProps } from "@/common/types/menu"
import MenuItem from "./MenuItem"

interface MenuItemProps {
    title?: string
    list: MenuProps[]
}

const Menu = ({ title, list }: MenuItemProps) => {
    return (
        <nav className="flex flex-col gap-y-1">
            {title && (
                <div className="mb-2 ml-2 mt-1 hidden text-sm text-neutral-600 dark:text-neutral-500 lg:block">
                    {title}
                </div>
            )}
            {list?.map((item: MenuProps, index: number) => (
                <MenuItem key={index} {...item} />
            ))}
        </nav>
    )
}

export default Menu