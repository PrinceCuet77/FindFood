import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const SearchSection = () => {
  return (
    <div className='mt-8 flex justify-center'>
      <Tabs
        defaultValue='food'
        className='w-[600px]'
      >
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='food' className='gap-2'>
            <span>Food</span>
          </TabsTrigger>
          <TabsTrigger value='restaurant'>Restaurant</TabsTrigger>
        </TabsList>
        <TabsContent value='food'>
          <Card>
            <CardHeader>
              <CardTitle>Food</CardTitle>
              <CardDescription>
                Search any food items what you are looking for...
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-2'>
              <div className='space-y-1'>
                <Input
                  id='name'
                  placeholder='Search food name'
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Search Food</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value='restaurant'>
          <Card>
            <CardHeader>
              <CardTitle>Restaurent</CardTitle>
              <CardDescription>
                Search any restaurants what you are looking for...
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-2'>
              <div className='space-y-1'>
                <Input
                  id='current'
                  type='password'
                  placeholder='Search restaurant name'
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Search Restaurant</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SearchSection;
