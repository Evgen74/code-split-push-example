import Foundation
import React
import ZIPFoundation

class CPDiskManager : NSObject {
  static let shared = CPDiskManager()
  var isFirstRun = false
  let fileManager = FileManager()
  let documentsUrl = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask).first!

  var bundleURL: NSURL {
    let defaultBundleUrl = RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")!
//    return NSURL(string: defaultBundleUrl.absoluteString)!
      
    #if !DEBUG
    let homePath = homeBundlePath()
    if (homePath != nil) {
      return NSURL(string: homePath!.absoluteString)!
    }
    #endif
    return NSURL(string: defaultBundleUrl.absoluteString)!

  }
    
    func prepareCodeSplitd() {
        do {
            let finalBundlesUrl = documentsUrl.appendingPathComponent("bundles")
            if (!fileManager.fileExists(atPath: finalBundlesUrl.path)) {
                let resUrl = Bundle.main.resourceURL!

                let bundlesUrl = resUrl.appendingPathComponent("bundles")
                
                let newBundleUrl = documentsUrl
                try fileManager.copyItem(at: bundlesUrl, to: finalBundlesUrl)
            }
        } catch {}
    }
  
  func prepareCodeSplit() {
      let finalBundlesUrl = documentsUrl.appendingPathComponent("bundles")
      
      do {
          if !fileManager.fileExists(atPath: finalBundlesUrl.path) {
              guard let resUrl = Bundle.main.resourceURL else { return }
              let sourceBundlesUrl = resUrl.appendingPathComponent("bundles")
              try fileManager.copyItem(at: sourceBundlesUrl, to: finalBundlesUrl)

            let topLevelItems = try fileManager.contentsOfDirectory(at: finalBundlesUrl,
                                                                    includingPropertiesForKeys: nil,
                                                                    options: [])

            let topLevelAssetsFolder = finalBundlesUrl.appendingPathComponent("assets")
            if !fileManager.fileExists(atPath: topLevelAssetsFolder.path) {
                try fileManager.createDirectory(at: topLevelAssetsFolder, withIntermediateDirectories: true)
            }
          
            for item in topLevelItems {
                guard item.hasDirectoryPath else { continue }

                let subItems = try fileManager.contentsOfDirectory(at: item,
                                                                    includingPropertiesForKeys: nil,
                                                                    options: [])
                
                for subItem in subItems {
                    let subFileName = subItem.lastPathComponent

                    if subFileName.hasSuffix(".ios.bundle") {
                        let newLocation = finalBundlesUrl.appendingPathComponent(subFileName)
                        try fileManager.moveItem(at: subItem, to: newLocation)
                    }
                    else if subFileName == "assets" {
                        try mergeAssetsRecursively(source: subItem, destination: topLevelAssetsFolder)
                    }
                }
                
                try fileManager.removeItem(at: item)
            }
          }
          
      } catch {
          print("Error copying or flattening bundles: \(error)")
      }
  }

  func mergeAssetsRecursively(source: URL, destination: URL) throws {
      if !fileManager.fileExists(atPath: destination.path) {
          try fileManager.createDirectory(at: destination, withIntermediateDirectories: true)
      }
      
      let items = try fileManager.contentsOfDirectory(at: source, includingPropertiesForKeys: nil, options: [])
      for item in items {
          let destItem = destination.appendingPathComponent(item.lastPathComponent)
          if item.hasDirectoryPath {
              try mergeAssetsRecursively(source: item, destination: destItem)
          } else {
              if fileManager.fileExists(atPath: destItem.path) {
                  try fileManager.removeItem(at: destItem)
              }
              try fileManager.moveItem(at: item, to: destItem)
          }
      }
      try fileManager.removeItem(at: source)
  }
    
    func copyCodeSplitDefaultBundles() {
        do {
            let finalBundlesUrl = documentsUrl.appendingPathComponent("bundles")
            try fileManager.removeItem(at: finalBundlesUrl)
            prepareCodeSplit()
        } catch {}
    }
  
  
  func homeBundlePath() -> URL? {
      let bundlesFolder = documentsUrl.appendingPathComponent("bundles")
      do {
          let contents = try fileManager.contentsOfDirectory(at: bundlesFolder, includingPropertiesForKeys: nil, options: [])
          for file in contents {
              let fileName = file.lastPathComponent
              if fileName.hasPrefix("home_") && fileName.hasSuffix(".ios.bundle") {
                  return file
              }
          }
      } catch {
          print("Error reading bundles directory: \(error)")
      }
      return nil
  }

}
