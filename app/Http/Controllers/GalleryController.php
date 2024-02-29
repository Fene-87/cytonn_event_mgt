<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class GalleryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $galleries = Gallery::all();
        $galleries = auth()->user()->galleries;

        return Inertia::render('Gallery', [
            'galleries' => $galleries
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $galleries = auth()->user()->galleries;
        return Inertia::render('NewGallery', []);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'caption' => 'required',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);

        if($request->hasFile('image')){
            $imagePath = $request->file('image')->store('galleries', 'public');
            auth()->user()->galleries()->create([
                'caption' => $request->input('caption'),
                'image' => $imagePath
            ]);

            return redirect()->route('galleries.index');
        };

        return back();
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Gallery $gallery)
    {
        return Inertia::render('GalleryEdit', [
            'gallery' => $gallery,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Gallery $gallery)
    {
        // $path = $gallery->image;
        $this->validate($request, [
            'caption' => 'required',
            // 'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);

        // if($request->hasFile('image')){
        //     Storage::delete($gallery->image);
        //     $imagePath = $request->file('image')->store('galleries', 'public'); 
        // }
        $gallery->update([
            'caption' => $request->input('caption'),
            // 'image' => $imagePath
        ]);
        return to_route('galleries.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Gallery $gallery)
    {
        Storage::delete($gallery->image);
        $gallery->delete();
        return back();
    }
}
