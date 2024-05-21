'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SelectCategory } from '../components/SelectCategory';
import { Textarea } from '@/components/ui/textarea';
import { TipTapEditor } from '../components/Editor';
import { UploadDropzone } from '../lib/uploadthing';
import { useEffect, useState } from 'react';
import { JSONContent } from '@tiptap/react';
import { useFormState } from 'react-dom';
import { SellProduct, State } from '../actions';
import { toast } from 'sonner';
import { SubmitButton } from '../components/SubmitButtons';
import { redirect } from 'next/navigation';


export default function SellRoute() {
  const initialState: State = { message: '', status: undefined };
  const [state, formAction] = useFormState(SellProduct, initialState);
  const [json, setJson] = useState<null | JSONContent>(null);
  const [images, setImages] = useState<null | string[]>(null);
  const [productFile, setProductFile] = useState<null | string>(null);

  useEffect(() => {
    if (state.status === 'success') {
      toast.success(state.message);
      redirect('/');
    } else if (state.status === 'error') {
      toast.error(state.message);
    }
  }, [state.status, state.message]);

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 mb-14">
      <Card>
        <form className="bg-slate-100" action={formAction}>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-purple-700">
              Sell your product
            </CardTitle>
            <CardDescription>
              Fill in the form below to sell your product
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-y-10">
            <div className="flex flex-col gap-y-2">
              <Label className="text-lg font-bold text-sky-700">
                Product Name
              </Label>
              <Input
                name="name"
                type="text"
                placeholder="Name of your product"
                required
                minLength={3}
              />
              {state?.errors?.['name']?.[0] && (
                <p className="text-destructive">
                  {state?.errors?.['name']?.[0]}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-y-2">
              <Label className="text-lg font-bold text-sky-700">Category</Label>
              <SelectCategory />
              {state?.errors?.['category']?.[0] && (
                <p className="text-destructive">
                  {state?.errors?.['category']?.[0]}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-y-2">
              <Label className="text-lg font-bold text-sky-700">Price</Label>
              <Input
                name="price"
                type="number"
                placeholder="Price of your product"
                required
                min={1}
              />
              {state?.errors?.['price']?.[0] && (
                <p className="text-destructive">
                  {state?.errors?.['price']?.[0]}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-y-2">
              <Label className="text-lg font-bold text-sky-700">
                Small Summary
              </Label>
              <Textarea
                name="smallDescription"
                placeholder="Please describe your product here..."
                required
                minLength={10}
              />
              {state?.errors?.['smallDescription']?.[0] && (
                <p className="text-destructive">
                  {state?.errors?.['smallDescription']?.[0]}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-y-2">
              <input
                type="hidden"
                name="description"
                value={JSON.stringify(json)}
              />
              <Label className="text-lg font-bold text-sky-700">
                Description
              </Label>
              <TipTapEditor json={json} setJson={setJson} />
              {state?.errors?.['description']?.[0] && (
                <p className="text-destructive">
                  {state?.errors?.['description']?.[0]}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-y-2">
              <input
                type="hidden"
                name="images"
                value={JSON.stringify(images)}
              />
              <Label className="text-lg font-bold text-sky-700">
                Product Images
              </Label>
              <UploadDropzone
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  setImages(res.map((item) => item.url));
                  toast.success('Image uploaded successfully');
                }}
                onUploadError={(error: Error) => {
                  toast.error(`Something went wrong. Please try again!: ${error}`);
                }}
              />
              {state?.errors?.['images']?.[0] && (
                <p className="text-destructive">
                  {state?.errors?.['images']?.[0]}
                </p>
              )}
            </div>
            {/* <div className="flex flex-col gap-y-2">
              <input
                type="hidden"
                name="productFile"
                value={productFile ?? ''}
              />
              <Label className="text-lg font-bold text-sky-700">
                Product File
              </Label>
              <UploadDropzone
                onClientUploadComplete={(res) => {
                  setProductFile(res[0].url);
                  toast.success('Product file uploaded successfully');
                }}
                endpoint="productFileUpload"
                onUploadError={(error: Error) => {
                  toast.error(`Something went wrong. Please try again!: ${error}`);
                }}
              />
              {state?.errors?.['productFile']?.[0] && (
                <p className="text-destructive">
                  {state?.errors?.['productFile']?.[0]}
                </p>
              )}
            </div> */}
          </CardContent>
          <CardFooter className="mt-5">
            <SubmitButton title="Create Product"/>
          </CardFooter>
        </form>
      </Card>
    </section>
  );
}
