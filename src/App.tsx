import './root.css';

import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './components/ui/dialog';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import Monaco from './components/Monaco';
import CodeEditor from './components/CodeEditor';

function App() {
  return (
    <div class={cn('w-screen h-screen overflow-hidden bg-background')}>
        <Dialog>
            <DialogTrigger as={Button}>Test Dialog :3</DialogTrigger>
            <DialogContent class='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div class='grid gap-4 py-4'>
                    <div class='grid grid-cols-4 items-center gap-4'>
                        <Label for='name' class='text-right'>
                        Name
                        </Label>
                        <Input id='name' value='Rosie :3' class='col-span-3' />
                    </div>
                    <div class='grid grid-cols-4 items-center gap-4'>
                        <Label for='username' class='text-right'>
                        Username
                        </Label>
                        <Input id='username' value='@rosie.pie' class='col-span-3' />
                    </div>
                </div>
                <DialogFooter>
                    <DialogTrigger as={Button} type='submit'>Save changes</DialogTrigger>
                </DialogFooter>
            </DialogContent>
        </Dialog>
        <div class={cn('flex w-screen h-screen overflow-hidden')}>
            <CodeEditor />
        </div>
    </div>
  );
}

export default App;
